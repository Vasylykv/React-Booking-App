import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../utils/api';

import BookableForm from './BookableForm';
import useFormState from './useFormState';

export default function BookableNew() {
  const navigate = useNavigate();
  const formState = useFormState();
  const queryClient = useQueryClient();

  const {
    mutate: createBookable,
    status,
    error,
  } = useMutation(
    (item) => createItem(`${process.env.REACT_APP_BASE_URL}/bookables`, item),
    {
      onSuccess: (bookable) => {
        queryClient.setQueryData('bookables', (old) => [
          ...(old || []),
          bookable,
        ]);
        navigate(`/bookables/${bookable.id}`);
      },
    }
  );

  function handleSubmit() {
    createBookable(formState.state);
  }

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return <p>Loading!!!</p>;
  }

  return <BookableForm formState={formState} handleSubmit={handleSubmit} />;
}
