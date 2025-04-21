import { useMutation } from "@tanstack/react-query";
import { voteCat } from "../api";

export const useVoteCat = () => {
    return useMutation<
      any,
      Error,
      { imageId: string; value: number }
    >({
      mutationFn: ({ imageId, value }) => voteCat(imageId, value),
    });
  };
  