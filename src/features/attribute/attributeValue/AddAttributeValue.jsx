import { useParams } from "react-router-dom";
import AttributeValueForm from "./AttributeValueForm";
import { Loader } from "lucide-react";
import useGetAttributeById from "../useGetAttributeById";

function AddAttributeValue() {
  const { id } = useParams()

  const { attribute, isLoading } = useGetAttributeById(id);

  if (isLoading) return <Loader />;

  return <AttributeValueForm attribute={attribute} isEditing={false}/>;
}

export default AddAttributeValue;
