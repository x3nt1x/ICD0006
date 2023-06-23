import { ETaskPriority, ETaskStatus } from "@/domain/IAssignment"

export const priorityColor = (priority: ETaskPriority): string =>
{
    switch (priority)
    {
        case ETaskPriority.High:
            return "priorityHigh";
        case ETaskPriority.Medium:
            return "priorityMedium";
        default:
            return "priorityLow";
    }
};

export const statusColor = (status: ETaskStatus): string =>
{
    switch (status)
    {
        case ETaskStatus.Archived:
            return "statusArchived";
        case ETaskStatus.Done:
            return "statusDone";
        case ETaskStatus.InProgress:
            return "statusInProgress";
        case ETaskStatus.OnHold:
            return "statusOnHold";
        case ETaskStatus.Paused:
            return "statusPaused";
        default:
            return "statusPending";
    }
}