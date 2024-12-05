import { useQuery } from "@tanstack/react-query";
import { getAttributeValueById } from "@/services/apiAttribute";

export default function useGetAttributeValueById(id) {
    const { data: attributeValue, isLoading } = useQuery({
        queryKey: [`attributeValue_${id}`],
        queryFn: () => getAttributeValueById(id),
    });

    return { attributeValue, isLoading };
}
