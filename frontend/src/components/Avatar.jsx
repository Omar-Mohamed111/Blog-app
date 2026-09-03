// Small presentational component - shows a person's initials in a colored
// circle. No logic beyond deriving the initials, used by Navbar, PostCard,
// CommentItem and Profile so avatars look consistent everywhere.
export default function Avatar({ name = "", size = "md" }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <div className={`avatar avatar-${size}`} aria-hidden="true">
      {initials || "?"}
    </div>
  );
}
