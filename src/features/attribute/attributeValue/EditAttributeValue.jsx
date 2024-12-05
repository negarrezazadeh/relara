import Loader from "@/ui/Loader";
import { useParams } from "react-router-dom";
import AttributeValueForm from "./AttributeValueForm";
import useGetAttributeValueById from "./useGetAttributeValueById";

function EditAttributeValue() {
  const { id } = useParams();  

  const { attributeValue, isLoading: isLoadingAttributeValue } = useGetAttributeValueById(id);

  if (isLoadingAttributeValue) return <Loader />;  

  return <AttributeValueForm isEditing={true} attributeValue={attributeValue}/>;
}

export default EditAttributeValue;

