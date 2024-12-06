import { useParams } from "react-router-dom";

import Loader from "@/ui/Loader";
import AttributeValueForm from "./AttributeValueForm";
import useGetAttributeById from "../useGetAttributeById";

function AddAttributeValue() {
  const { id } = useParams()

  const { attribute, isLoading } = useGetAttributeById(id);

  if (isLoading) return <Loader />;

  return <AttributeValueForm attribute={attribute} isEditing={false}/>;
}

export default AddAttributeValue;
