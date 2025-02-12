import React from "react";
import EscalaNotasForm from "@/components/escala/form";
import { ThemedView } from "@/components/ui/ThemedView";

export default function EscalaPage() {
  return (
    <ThemedView className="flex-1">
      <EscalaNotasForm />
    </ThemedView>
  );
}
