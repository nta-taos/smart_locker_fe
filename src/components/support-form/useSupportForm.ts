import { SupportFormData } from '../../types/SupportForm.types';

export const defaultFormData: SupportFormData = {
  name: '',
  phone: '',
  email: '',
  message: '',
  file: null,
};

export const handleChange = (
  form: SupportFormData,
  setForm: React.Dispatch<React.SetStateAction<SupportFormData>>,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  setForm({
    ...form,
    [e.target.name]: (e.target as HTMLInputElement).files?.[0] || e.target.value,
  });
};

export const handleSubmit = () => {};
