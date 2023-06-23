import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../Root";
import { AssignmentsService } from "../../services/AssignmentService";
import { IAssignment, ETaskPriority, ETaskStatus } from "../../domain/IAssignment";
import AssignmentCreateView from "./AssignmentCreateView";

const AssignmentCreate = () =>
{
    const navigate = useNavigate();

    const [values, setInput] = useState({
        title: "",
        description: "",
        priority: ETaskPriority.High,
        status: ETaskStatus.Pending,
        dueDate: "",
        orderId: "c44d49e8-d011-4c17-ad16-e24cceefde90"
    } as IAssignment);

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const assignmentService = new AssignmentsService(setJwtResponse!)
    const [validationErrors, setValidationErrors] = useState([] as string[]);
    const [date, setDate] = useState(new Date());

    const handleChange = (target: EventTarget & HTMLInputElement | HTMLSelectElement) =>
    {
        const value = target.tagName === 'SELECT' ? parseInt(target.value) : target.value;

        setInput({ ...values, [target.name]: value });
    }

    const handleDate = (date: Date) =>
    {
        setDate(date);
    }

    const onSubmit = async (event: MouseEvent) =>
    {
        event.preventDefault();
        setValidationErrors([]);

        if (values.title.length === 0 || values.description.length === 0)
        {
            setValidationErrors(["Bad input values!"]);
            return;
        }

        values.dueDate = date.toLocaleDateString('en-CA');

        let assignment = await assignmentService.post(jwtResponse!, values);

        if (assignment)
            navigate("/assignments");
    }

    return (<AssignmentCreateView values={values} date={date} validationErrors={validationErrors} handleChange={handleChange} handleDate={handleDate} onSubmit={onSubmit} />);
}

export default AssignmentCreate;