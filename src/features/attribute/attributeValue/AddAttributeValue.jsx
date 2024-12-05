import { useParams } from "react-router-dom";
import AttributeValueForm from "./AttributeValueForm";
import useGetAttributeById from "../useGetAttributeById";
import Loader from "@/ui/Loader";

function AddAttributeValue() {
  const { id } = useParams()

  const { attribute, isLoading } = useGetAttributeById(id);

  if (isLoading) return <Loader />;

  return <AttributeValueForm attribute={attribute} isEditing={false}/>;
}

export default AddAttributeValue;
