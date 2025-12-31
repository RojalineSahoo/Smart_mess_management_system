export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h2>Profile</h2>
      <p>Roll No: {user.roll_no}</p>
      <p>Branch: {user.branch}</p>
      <p>Room: {user.room_no}</p>
    </div>
  );
}
