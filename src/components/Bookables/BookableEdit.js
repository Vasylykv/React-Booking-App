import { useQueryClient, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useFormState from './useFormState';
import getData from '../../utils/api';

import PageSpinner from '../UI/PageSpinner';
import BookableForm from './BookableForm';

export default function BookableEdit() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    'bookables',
    () => getData('http://localhost:3001/bookables'),
    {
      initialData: queryClient
        .getQueryData('bookables')
        ?.find((bookable) => bookable.id === parseInt(id, 10)),
    }
  );

  const formState = useFormState(data);

  function handleDelete() {}

  function handleSubmit() {}

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}
