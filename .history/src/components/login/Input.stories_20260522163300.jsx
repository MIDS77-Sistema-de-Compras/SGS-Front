import { Input } from "./Input";

export default {
    title: 'Login/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text']
        }
    }
}