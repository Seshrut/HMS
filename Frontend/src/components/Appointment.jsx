export default function AppointmentItem({ name, time, status }) {
    return (
        <div className="appointment-item">
            <div className="appt-avatar">👤</div>
            <div className="appt-info">
                <div className="appt-name">{name}</div>
                <div className="appt-time">{time}</div>
            </div>
            <span className={`appt-badge ${status}`}>{status}</span>
        </div>
    )
}