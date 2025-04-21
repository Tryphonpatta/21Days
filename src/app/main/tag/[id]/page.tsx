import TagPage from "./tagPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <TagPage id={id}></TagPage>
    </div>
  );
}
