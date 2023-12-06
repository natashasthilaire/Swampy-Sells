import { useQuery, useMutation, useQueryClient } from 'react-query';

export function UseRequestProcessor() {
  const queryClient = useQueryClient();

  function Query(key, queryFunction, options = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  /*function mutate(key, mutationFunction, options = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }
  */

  return { Query };
}