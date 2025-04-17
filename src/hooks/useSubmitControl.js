import { useState } from "react";

export default function useSubmitControl() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startSubmitting = () => setIsSubmitting(true);
  const stopSubmitting = () => setIsSubmitting(false);

  return { isSubmitting, startSubmitting, stopSubmitting };
}
