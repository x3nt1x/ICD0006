import { useContext, useEffect, useState } from "react";
import { JwtContext } from "../Root";
import { IAssignment } from "../../domain/IAssignment";
import { AssignmentsService } from "../../services/AssignmentService";
import AssignmentListView from "./AssignmentListView";

const AssignmentList = () =>
{
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const [data, setData] = useState([] as IAssignment[]);

    const assignmentService = new AssignmentsService(setJwtResponse!);

    useEffect(() =>
    {
        if (!jwtResponse)
            return;

        assignmentService.getAll(jwtResponse).then(response =>
        {
            if (response)
                setData(response);
            else
                setData([]);
        });
    }, [jwtResponse]);

    return (<AssignmentListView data={data} />);
}

export default AssignmentList;