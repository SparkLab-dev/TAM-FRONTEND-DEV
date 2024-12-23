import * as React from "react";
import Textarea from "@mui/joy/Textarea";

interface Props {
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function OutlineTextarea({
  rows,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <Textarea
      placeholder={placeholder}
      minRows={rows}
      onChange={onChange}
      sx={{
        "&::before": {
          display: "none",
        },
        "&:focus-within": {
          outline: "2px solid var(--Textarea-focusedHighlight)",
          outlineOffset: "2px",
        },
      }}
    />
  );
}
