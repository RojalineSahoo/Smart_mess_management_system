export default function NoticeBoard({ notices }) {
  const isNew = (date) =>
    // eslint-disable-next-line react-hooks/purity
    (Date.now() - new Date(date)) / (1000 * 60 * 60) <= 24;

  return (
    <div>
      {notices.map(n => (
        <div key={n._id} className="border p-2">
          <p>{n.content}</p>
          {isNew(n.created_at) && (
            <span className="text-red-500 text-sm">NEW</span>
          )}
        </div>
      ))}
    </div>
  );
}
