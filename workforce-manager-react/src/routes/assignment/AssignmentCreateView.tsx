import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ETaskPriority, ETaskStatus, IAssignment } from "../../domain/IAssignment";
import { getAllEnumKeys } from 'enum-for'
import DatePicker from "react-datepicker";

interface IProps
{
    values: IAssignment;
    date: Date;
    validationErrors: string[];
    handleChange: (target: EventTarget & HTMLInputElement | HTMLSelectElement) => void;
    handleDate: (target: Date) => void;
    onSubmit: (event: MouseEvent) => void;
}

const AssignmentCreateView = (props: IProps) =>
{
    return (
        <>
            <h1>Create</h1>

            <h4>Assignment</h4>
            <hr />

            <ul style={{ 'display': props.validationErrors.length === 0 ? 'none' : '' }}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <div className="row">
                <div className="col-md-4">
                    <form action="/Assignments/Create" method="post">

                        <div className="form-group">
                            <label htmlFor="Title">Title</label>
                            <input
                                onChange={(e) => props.handleChange(e.target)}
                                value={props.values.title}
                                className="form-control" aria-required="true" type="text" id="Title" name="title" maxLength={32} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Description">Description</label>
                            <input
                                onChange={(e) => props.handleChange(e.target)}
                                value={props.values.description}
                                className="form-control" aria-required="true" type="text" id="Description" name="description" maxLength={1024} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Priority">Priority</label>
                            <select
                                onChange={(e) => props.handleChange(e.target)}
                                value={props.values.priority}
                                className="form-control" id="Priority" name="priority">

                                {getAllEnumKeys(ETaskPriority).map((key, value) =>
                                    <option value={value}>{key}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Status">Status</label>
                            <select
                                onChange={(e) => props.handleChange(e.target)}
                                value={props.values.status}
                                className="form-control" id="Status" name="status">

                                {getAllEnumKeys(ETaskStatus).map((key, value) =>
                                    <option value={value}>{key}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="DueDate">Due Date</label>
                            <DatePicker
                                onChange={(date) => props.handleDate(date!)}
                                selected={props.date}
                                className="form-control" />
                        </div>

                        <button
                            onClick={(e) => props.onSubmit(e)}
                            className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>

            <div>
                <Link to="/assignments">Back to List</Link>
            </div>
        </>
    );
}

export default AssignmentCreateView;