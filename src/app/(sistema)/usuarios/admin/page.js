'use client';
import { useState } from 'react';

export default function CadastroUsuarios() {
  const [nivelAcesso, setNivelAcesso] = useState('DOCENTE');

  return (
    <div className="w-full h-full pb-12 flex flex-col">

      <div className="bg-white p-5 rounded-xl shadow-sm border border-[#AAAAAA] flex flex-col justify-between">

        <div>
          <div className="w-full">
            <h1 className="text-[22px] font-bold text-[#103D85]">
              Cadastrar Usuário
            </h1>
          </div>

          <div className="border-t border-[#AAAAAA] mt-2 mb-5 -mx-5" />

          <form onSubmit={(e) => e.preventDefault()}>

            <div>
              <div className="flex items-center gap-2 ">
                <div className="w-[4px] h-4 bg-[#103D85] rounded-xl" />

                <h2 className="text-sm font-bold text-[#103D85] tracking-widest">
                  IDENTIFICAÇÃO DE USUÁRIO
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="md:col-span-2">
                  <label className="block text-[12px] font-bold text-[#103D85]/70 mb-2 pt-4 pb-px">
                    Nome Completo <span className="text-[#BA1A1A]">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Nome completo do usuário..."
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-[#6B7280] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#103D85]/70 mb-1">
                    Telefone
                  </label>

                  <div className="flex rounded-xl border border-gray-200 shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">

                    <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-200 text-gray-400 text-sm">
                      <img
                        src="/images/adm/telefone.png"
                        alt="Ícone de nível de acesso"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="+55 (47) 99876-5432"
                      className="w-full px-3 py-2.5 text-sm placeholder-[#6B7280]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#103D85]/70 mb-1">
                    Ramal <span className="text-[#BA1A1A]">*</span>
                  </label>

                  <div className="flex rounded-xl border border-gray-200 shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">

                    <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-200 text-gray-400 text-sm">
                      <img
                        src="/images/adm/telefone.png"
                        alt="Ícone de nível de acesso"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="3222-0000"
                      className="w-full px-3 py-2.5 text-sm placeholder-[#6B7280]"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[12px] font-bold text-[#103D85]/70 mb-1">
                    E-mail institucional <span className="text-[#BA1A1A]">*</span>
                  </label>

                  <input
                    type="email"
                    placeholder="gabri_glowglow@senai.edu"
                    className="w-full px-3 py-2.5 border border-gray-200 shadow-sm rounded-xl text-sm placeholder-[#6B7280]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[12px] font-bold text-[#103D85]/70 mb-2">
                    Senha <span className="text-[#BA1A1A]">*</span>
                  </label>

                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-3 py-2.5 border border-gray-200 shadow-sm rounded-xl text-sm placeholder-[#6B7280]"
                  />

                  <div className="flex gap-3 pt-5">
                    <div className="h-2 w-1/4 bg-[#103D85] rounded"></div>
                    <div className="h-2 w-1/4 bg-[#103D85] rounded"></div>
                    <div className="h-2 w-1/4 bg-[#103D85] rounded"></div>
                    <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
                  </div>

                  <span className="text-[10px] text-gray-500 block pt-2">
                    Nível de força
                  </span>
                </div>

              </div>
            </div>

            <div className="mt-10">

              <div className="flex items-center gap-2">
                <div className="w-[4px] h-4 bg-[#103D85] rounded-xl" />

                <h2 className="text-[14px] font-bold text-[#103D85] tracking-widest">
                  NÍVEL DE ACESSO
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">

                {['COORDENADOR', 'SUPERVISOR', 'DOCENTE', 'COMPRADOR REG.'].map((nivel) => (

                  <button
                    key={nivel}
                    type="button"
                    onClick={() => setNivelAcesso(nivel)}
                    className={`py-3 px-4 rounded-xl border text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${nivelAcesso === nivel
                        ? 'bg-[#103D85] text-white border-[#103D85]'
                        : 'bg-white text-[#103D85] border-gray-200 hover:bg-gray-100'
                      }`}
                  >

                    <img
                      src="/images/adm/usuario.png"
                      alt="Ícone de nível de acesso"
                      className={`w-4 h-4 duration-200 ${nivelAcesso === nivel
                          ? 'brightness-0 invert'
                          : ''
                        }`}
                    />

                    {nivel}

                  </button>
                ))}

              </div>
            </div>

          </form>
        </div>



      </div>

      <div className="flex justify-end pt-4">

        <button
          type="submit"
          className="bg-[#103D85] hover:bg-[#0b2a5c] text-white font-bold text-[14px] py-3 px-27 rounded-xl transform translate-y-[30px]"
        >
          Criar Usuário +
        </button>

      </div>

    </div>
  );
}