import { Link } from "react-router-dom";
import { IAssignment, ETaskPriority, ETaskStatus } from "../../domain/IAssignment";

interface IProps
{
    data: IAssignment[];
}

const AssignmentListView = (props: IProps) =>
{
    return (
        <>
            <div className="input-inline">
                <div className="input-group w-auto float-start">
                    <Link to="/assignments/create" className="btn btn-primary">Create New</Link>
                </div>

                <form>
                    <div className="input-group w-auto float-end">
                        <div className="form-outline">
                            <input type="search" asp-for="Search" className="form-control" placeholder="search" />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>DueDate</th>
                        <th>Manage</th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.map((task, index) =>
                    (
                        <tr key={index} data-index={index}>
                            <td className="align-middle"><Link to={`/assignments/${task.id}`}>{task.id}</Link></td>
                            <td className="align-middle">{task.title}</td>
                            <td className="align-middle priority">{ETaskPriority[task.priority]}</td>
                            <td className="align-middle status">{ETaskStatus[task.status]}</td>
                            <td className="align-middle">{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className="align-middle">
                                <Link to="#" className="btn btn-dark">Start</Link>
                                &nbsp;
                                <Link to="#" className="btn btn-success btn-circle"><i className="fa fa-check"></i></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AssignmentListView;