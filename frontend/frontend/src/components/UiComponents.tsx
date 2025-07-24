import { Chip, ChipProps } from "@mui/material";

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
