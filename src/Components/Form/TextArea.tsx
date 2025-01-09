import * as React from "react";
import Textarea from "@mui/joy/Textarea";

interface Props {
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  errorMessage: string;
}

export default function OutlineTextarea({
  rows,
  placeholder,
  value,
  onChange,
  name,
  errorMessage,
}: Props) {
  return (
    <div>
      <Textarea
        name={name}
        placeholder={placeholder}
        minRows={rows}
        onChange={onChange}
        value={value}
        error={!!errorMessage}
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
      {errorMessage && <p className="text-red-400">{errorMessage}</p>}
    </div>
  );
}
