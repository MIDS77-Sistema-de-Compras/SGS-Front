## Como rodar o ambiente de desenvolvimento com certificado SSL?

Este doc tem como objetivo te ajudar a conseguir utilizar HTTPS no seu ambiente de desenvolvimento NextJS.

> [!NOTE]
> Execute os comandos dentro da pasta do projeto.

### Crie a pasta `certificates`

```powershell
New-Item -ItemType Directory -Force -Path .\certificates
```

### Gere o certificado em uma variável no powershell

```powershell
$cert = New-SelfSignedCertificate -DnsName "localhost","127.0.0.1" -CertStoreLocation "Cert:\CurrentUser\My" -KeyExportPolicy Exportable -KeySpec Signature -KeyLength 2048 -KeyAlgorithm RSA -HashAlgorithm SHA256 -NotAfter (Get-Date).AddYears(2)
```

### Adicione o certificado na lista de confiança do Windows

```powershell
$store = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root","CurrentUser")

$store.Open("ReadWrite")

$store.Add($cert)

$store.Close()
```

### Exporte para `.pfx`

```powershell
$pwd = ConvertTo-SecureString -String "temp1234" -Force -AsPlainText

Export-PfxCertificate -Cert $cert -FilePath ".\certificates\localhost.pfx" -Password $pwd
```

### Abra o `git bash` e entre na pasta do projeto

```bash
cd caminho/ate/o/projeto/SGC-Front
```

### Converta as chaves para `.pem` no `bash`

```bash
openssl pkcs12 -in certificates/localhost.pfx -nocerts -out certificates/localhost-key.pem -nodes -passin pass:temp1234

openssl pkcs12 -in certificates/localhost.pfx -clcerts -nokeys -out certificates/localhost.pem -passin pass:temp1234
```

### Verifique se a pasta certificates existe no projeto

Se existir, vá para o próximo passo, se não, você fez algo errado em algum passo do tutorial.

Após isso, execute o projeto utilizando o comando `npm run devssl`.

Acesse a URL `https://localhost:3000` ou `https://localhost:3001` e veja o projeto funcionando!