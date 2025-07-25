import { Button, Chip, ChipProps } from "@mui/material";

interface PRStateChipProps extends Omit<ChipProps, "label"> {
  state: string;
}

const getChipColor = (state: string): string => {
  switch (state) {
    case "OPEN":
      return "#0C66E4";
    case "DRAFT":
      return "#44546F";
    case "MERGED":
      return "#1F845A";
    case "DECLINED":
      return "#C9372C";
    default:
      return "#DCDFE4";
  }
};

export function PRStateChip({ state, ...rest }: PRStateChipProps) {
  return (
    <Chip
      label={state}
      sx={{
        backgroundColor: getChipColor(state),
        color: "white",
        fontWeight: "bold",
        padding: 0,
        minWidth: "unset",
        height: "20px",
        borderRadius: "5px",
        "& .MuiChip-label": {
          padding: "0 5px",
          fontSize: "0.7rem",
        },
      }}
      {...rest}
    />
  );
}

export function PRBranchChip({ state, ...rest }: PRStateChipProps) {
  return (
    <Chip
      label={state}
      sx={{
        backgroundColor: "#DCDFE4",
        color: "#172b4d",
        padding: 0,
        minWidth: "unset",
        maxWidth: "150px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        height: "20px",
        borderRadius: "5px",
        "& .MuiChip-label": {
          padding: "0 5px",
          fontSize: "0.7rem",
        },
      }}
      {...rest}
    />
  );
}

export function ArrowForward() {
  return (
    <span className="arrow">
      <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M1 8h14M9 3l6 5-6 5"
          stroke="#6b7280"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </span>
  );
}

export function ArrowBackward() {
  return (
    <span className="arrow">
      <svg
        width="16"
        height="16"
        fill="#172b4d"
        viewBox="0 0 16 16"
        style={{ verticalAlign: "middle", display: "inline-block" }}
      >
        <path
          d="M15 8H1M7 3l-6 5 6 5"
          stroke="#172b4d"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </span>
  );
}

export function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <Button
      variant="outlined"
      onClick={onBack}
      className="outlined-button"
      size="small"
      sx={{
        alignItems: "center",
        gap: 0.5,
        display: "flex",
      }}
    >
      <ArrowBackward /> Back
    </Button>
  );
}
