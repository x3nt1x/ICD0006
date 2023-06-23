import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ETaskPriority, ETaskStatus, IAssignment } from "../../domain/IAssignment";
import { IComment } from "../../domain/IComment";

interface IProps
{
    data: IAssignment | undefined;
    comments: IComment[];
    onDelete: (event: MouseEvent) => void;
    onArchive: (event: MouseEvent) => void;
    onDone: (event: MouseEvent) => void;
}

const AssignmentView = (props: IProps) =>
{
    return (
        <>
            <div className="container text-center">
                <div className="row row-cols-2">

                    <div className="col">
                        <h3>Details</h3>

                        <div>
                            <dl className="row">
                                <dt className="col-sm-2">UID</dt>
                                <dd className="col-sm-10">{props.data?.id}</dd>

                                <dt className="col-sm-2">Title</dt>
                                <dd className="col-sm-10">{props.data?.title}</dd>

                                <dt className="col-sm-2"> Priority </dt>
                                <dd className="col-sm-10">{props.data?.priority ? ETaskPriority[props.data?.priority] : undefined}</dd>

                                <dt className="col-sm-2">Status</dt>
                                <dd className="col-sm-10">{props.data?.priority ? ETaskStatus[props.data?.status] : undefined}</dd>

                                <dt className="col-sm-2">DueDate</dt>
                                <dd className="col-sm-10">{props.data?.dueDate}</dd>
                            </dl>
                        </div>
                    </div>

                    <div className="vl"></div>

                    <div className="col">
                        <h3>Description</h3>

                        <div>
                            <p>{props.data?.description}</p>
                        </div>
                    </div>

                    <hr /><hr />

                    <div className="col">
                        <h3>Comments</h3>

                        {props.comments.map((comment, index) =>
                        (
                            <tr key={index} data-index={index}>
                                <td className="align-middle">{comment.firstName}</td>
                                <td className="align-middle">{comment.lastName}</td>
                                <td className="align-middle">{comment.content}</td>
                            </tr>
                        ))}
                    </div>

                    <div className="col">
                        <h3>Workers</h3>
                    </div>

                    <hr /><hr />
                </div>
            </div>

            <div className="input-inline">
                <div className="input-group w-auto float-start">
                    <button
                        onClick={(e) => props.onDelete(e)}
                        className="btn btn-danger">
                        Delete
                    </button>
                </div>

                <div className="input-group w-auto float-end">
                    <div className="input-group w-auto float-start">
                        <button
                            onClick={(e) => props.onArchive(e)}
                            className="btn btn-secondary">
                            Archive
                        </button>
                    </div>

                    <div className="input-group w-auto float-start">
                        <button
                            onClick={(e) => props.onDone(e)}
                            className="btn btn-success ms-2">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AssignmentView;