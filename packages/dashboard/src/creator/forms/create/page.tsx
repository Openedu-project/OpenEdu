import { FormEditorLayout } from "@oe/ui";
import { Suspense } from "react";

export function CreateForm() {
  return (
    <Suspense>
      <FormEditorLayout dashboard="creator" action="create" />
    </Suspense>
  );
}
