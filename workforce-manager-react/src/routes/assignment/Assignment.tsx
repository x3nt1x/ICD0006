import { useContext, useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../Root";
import { ETaskStatus, IAssignment } from "../../domain/IAssignment";
import { AssignmentsService } from "../../services/AssignmentService";
import AssignmentView from "./AssignmentView";
import { IComment } from "../../domain/IComment";

const Assignment = () =>
{
    const navigate = useNavigate();

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const [data, setData] = useState(undefined as unknown as IAssignment | undefined);
    const [comments, setComments] = useState<IComment[]>([]);

    const assignmentService = new AssignmentsService(setJwtResponse!);

    useEffect(() =>
    {
        if (!jwtResponse)
            return;

        const id = window.location.pathname.split('/')[2];

        assignmentService.find(jwtResponse, id).then(response =>
        {
            if (response)
                setData(response);
            else
                setData(undefined);
        });

        assignmentService.getAssignmentComments(jwtResponse, id).then(response =>
        {
            if (response)
                setComments(response);
            else
                setComments([]);
        })

    }, [jwtResponse]);

    const onDelete = async (event: MouseEvent) =>
    {
        event.preventDefault();

        const response = await assignmentService.delete(jwtResponse!, data?.id!);

        if (response)
            navigate("/assignments");
    }

    const onArchive = async (event: MouseEvent) =>
    {
        event.preventDefault();

        data!.status = ETaskStatus.Archived;

        const response = await assignmentService.put(jwtResponse!, data!);

        if (response)
            navigate("/assignments");
    }

    const onDone = async (event: MouseEvent) =>
    {
        event.preventDefault();

        data!.status = ETaskStatus.Done;

        const response = await assignmentService.put(jwtResponse!, data!);

        if (response)
            navigate("/assignments");
    }

    return (<AssignmentView data={data} comments={comments} onDelete={onDelete} onDone={onDone} onArchive={onArchive} />);
}

export default Assignment;