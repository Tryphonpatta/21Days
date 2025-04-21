import GoalPage from "@/components/goalDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <GoalPage id={id}></GoalPage>
    </div>
  );
}
