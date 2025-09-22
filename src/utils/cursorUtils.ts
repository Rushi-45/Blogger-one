import { type CursorState } from "../types/index";

/**
 * DRY-compliant cursor state management utility
 * Returns appropriate Tailwind cursor classes based on component state
 */
export const getCursorClasses = (state: CursorState): string => {
  const { type, isLoading, isDisabled, isInteractive } = state;

  if (isDisabled) {
    return "cursor-disabled";
  }

  if (isLoading) {
    return "cursor-loading";
  }

  if (isInteractive) {
    return "cursor-interactive";
  }

  switch (type) {
    case "pointer":
      return "cursor-pointer";
    case "wait":
      return "cursor-wait";
    case "not-allowed":
      return "cursor-not-allowed";
    case "grab":
      return "cursor-grab";
    case "grabbing":
      return "cursor-grabbing";
    default:
      return "cursor-default";
  }
};

/**
 * Common cursor states for different UI elements
 */
export const CURSOR_STATES = {
  BUTTON: (
    isLoading: boolean = false,
    isDisabled: boolean = false
  ): CursorState => ({
    type: "pointer",
    isLoading,
    isDisabled,
    isInteractive: !isLoading && !isDisabled,
  }),

  LINK: (isDisabled: boolean = false): CursorState => ({
    type: "pointer",
    isDisabled,
    isInteractive: !isDisabled,
  }),

  CARD: (isClickable: boolean = true): CursorState => ({
    type: isClickable ? "pointer" : "default",
    isInteractive: isClickable,
  }),

  DRAGGABLE: (isDragging: boolean = false): CursorState => ({
    type: isDragging ? "grabbing" : "grab",
    isInteractive: true,
  }),

  LOADING: (): CursorState => ({
    type: "wait",
    isLoading: true,
  }),

  DISABLED: (): CursorState => ({
    type: "not-allowed",
    isDisabled: true,
  }),
} as const;
