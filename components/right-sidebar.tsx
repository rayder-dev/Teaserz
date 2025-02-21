import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { GlowingAvatar } from "@/components/ui/glowing-avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export function RightSidebar() {
  return (
    <GlassCard
      className="h-full border-l rounded-none"
      gradient="from-white/[0.02] to-transparent"
    >
      <div className="p-4 space-y-6">
        <UserProfile />
        <NewMembers />
        <RecentActivity />
      </div>
    </GlassCard>
  );
}

function UserProfile() {
  return (
    <div className="flex flex-col items-center text-center">
      <GlowingAvatar
        size="lg"
        src="/avatars/09.webp"
        fallback="SF"
        glowColor="from-purple-600 to-blue-600"
      />
      <h3 className="text-xl font-bold text-white mt-4">Ray Dev</h3>
      <p className="text-gray-400">@rayder-dev</p>
    </div>
  );
}

function NewMembers() {
  const members = [
    { name: "Anne Couture", avatarSrc: "/avatars/01.webp", time: "3 min ago" },
    {
      name: "Miriam Soleil",
      avatarSrc: "/avatars/02.webp",
      time: "20 min ago",
    },
    { name: "Marie Laval", avatarSrc: "/avatars/03.webp", time: "35 min ago" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white font-medium">New Members</h4>
        <Button variant="link" className="text-gray-400 hover:text-white">
          See all
        </Button>
      </div>
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center gap-3 p-2 rounded-lg bg-gray-300/10 hover:bg-white/5 transition-colors"
          >
            <Avatar className="bg-sky-600">
              <AvatarImage
                src={member.avatarSrc}
                alt={member.name}
                loading="lazy"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                {member.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-white">{member.name}</p>
              <p className="text-xs text-gray-400">{member.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity() {
  const activities = [
    {
      user: "Hola Spine",
      avatarSrc: "/avatars/04.webp",
      action: "invited you to a channel",
      time: "2 min ago",
    },
    {
      user: "Eva Solain",
      avatarSrc: "/avatars/05.webp",
      action: "invited you to a chat",
      time: "20 min ago",
    },
    {
      user: "Pierre Ford",
      avatarSrc: "/avatars/06.webp",
      action: "started following you",
      time: "35 min ago",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white font-medium">Recent Activity</h4>
        <Button variant="link" className="text-gray-400 hover:text-white">
          See all
        </Button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.user}
            className="flex items-center gap-3 p-2 rounded-lg bg-gray-300/10 hover:bg-white/5 transition-colors"
          >
            <Avatar className="bg-violet-600">
              <AvatarImage
                src={activity.avatarSrc}
                alt={activity.user[0]}
                loading="lazy"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                {activity.user[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-white">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
