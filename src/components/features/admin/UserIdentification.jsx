import FormField from '@/components/ui/form/FormField';
import Input from '@/components/ui/input/Input';
import PhoneInput from '@/components/ui/input/PhoneInput';
import PasswordField from './PasswordField';
import FieldError from '@/components/ui/notifications/FieldError';

const INPUT_CLASS = "!h-auto py-2.5 !text-sm !border-gray-100 dark:!border-white/15 !rounded-xl !shadow-sm !bg-white dark:!bg-[#303746] dark:!text-[#E2E2EA] dark:placeholder:!text-[#C3C6D3] focus:!border-[#103D85] dark:focus:!border-[#1A4A9E] focus:!ring-0.5 focus:!ring-[#103D85] dark:focus:!ring-[#1A4A9E]";

export default function UserIdentificationSection({ formData, errors, onChange, onBlur }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            <FormField label="Nome Completo" required className="md:col-span-2">
                <Input
                    placeholder="Nome completo do usuário..."
                    className={INPUT_CLASS}
                    value={formData.nome}
                    onChange={(e) => onChange('nome', e.target.value)}
                    onBlur={() => onBlur('nome', formData.nome)}
                />
                <FieldError message={errors.nome} />
            </FormField>

            <FormField label="CPF" required>
                <Input
                    placeholder="000.000.000-00"
                    className={INPUT_CLASS}
                    value={formData.cpf}
                    onChange={(e) => onChange('cpf', e.target.value)}
                    onBlur={() => onBlur('cpf', formData.cpf)}
                />
                <FieldError message={errors.cpf} />
            </FormField>

            <FormField label="Ramal" required>
                <PhoneInput
                    placeholder="3344"
                    className="!h-auto !text-sm !border-gray-100 dark:!border-white/15 !rounded-xl !shadow-sm !bg-white dark:!bg-[#303746] dark:!text-[#E2E2EA] focus:!border-[#103D85] dark:focus:!border-[#1A4A9E] focus:!ring-0.5 focus:!ring-[#103D85] dark:focus:!ring-[#1A4A9E]"
                    value={formData.ramal}
                    onChange={(e) => onChange('ramal', e.target.value)}
                    onBlur={() => onBlur('ramal', formData.ramal)}
                />
                <FieldError message={errors.ramal} />
            </FormField>

            <FormField label="E-mail institucional" required className="md:col-span-2">
                <Input
                    type="email"
                    placeholder="nome@senai.edu"
                    className={INPUT_CLASS}
                    value={formData.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    onBlur={() => onBlur('email', formData.email)}
                />
                <FieldError message={errors.email} />
            </FormField>

            <div className="md:col-span-2">
                <PasswordField
                    value={formData.senha}
                    onChange={(e) => onChange('senha', e.target.value)}
                    onBlur={() => onBlur('senha', formData.senha)}
                    error={errors.senha}
                />
            </div>
        </div>
    );
}