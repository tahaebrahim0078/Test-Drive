import { IconType } from "react-icons";

interface ContactInfoCardProps {
  info: {
    icon: IconType;
    title: string;
    description: string;
    color: string;
  };
}

export default function ContactInfoCard({ info }: ContactInfoCardProps) {
  const Icon = info.icon;
  
  return (
    <div className={`bg-linear-to-br ${info.color} rounded-lg p-8 text-white shadow-lg hover:shadow-xl transition text-center`}>
      <Icon className="text-4xl mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">{info.title}</h3>
      <p className="opacity-90">{info.description}</p>
    </div>
  );
}