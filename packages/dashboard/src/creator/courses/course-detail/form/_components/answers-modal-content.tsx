import { useGetFormResponses, useGetFormSummary } from '@oe/api/hooks/useForms';

export function AnswersModalContent({
  id,
  formUID,
}: {
  id: string;
  formUID: string;
}) {
  const { dataFormResponses } = useGetFormResponses(id, {
    all_versions: true,
    preloads: 'Users',
  });
  const { dataFormSummary } = useGetFormSummary(formUID);

  console.log(dataFormResponses, dataFormSummary);
  return <div>Answers</div>;
}
