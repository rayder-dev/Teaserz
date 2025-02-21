interface CommunityCardProps {
  title: string;
  gradient: string;
  online: string;
  members: string;
}

export function CommunityCard({
  title,
  gradient,
  online,
  members,
}: CommunityCardProps) {
  return (
    <div
      className={`relative group overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10 group-hover:bg-black/20 transition-colors"></div>
      <div className="relative p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-200 mb-4">
          Great place to hang out and meet new peoples.
        </p>
        <div className="flex justify-between text-sm text-gray-200">
          <span>{online} Online</span>
          <span>{members} Members</span>
        </div>
      </div>
    </div>
  );
}
