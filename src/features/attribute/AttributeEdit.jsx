import { useParams } from "react-router-dom";
import AttributeForm from "./AttributeForm";
import useGetAttributeById from "./useGetAttributeById";
import Loader from "@/ui/Loader";

function AttributeEdit() {
  const { id } = useParams();

  const { attribute, isLoading } = useGetAttributeById(id);

  if (isLoading) return <Loader />;  

  return <AttributeForm attribute={attribute}/>;
}

export default AttributeEdit;
