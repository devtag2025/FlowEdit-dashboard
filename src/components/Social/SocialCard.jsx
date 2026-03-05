import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export const SocialCard = ({
  platform,
  icon: Icon,
  status,
  description,
  buttonText,
  buttonAction,
  connectionNote,
  requirements,
  iconBgColor,
}) => {
  const isConnected = status === "connected";

  return (
    <Card className="border rounded-3xl shadow-none bg-tertiary">
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`${iconBgColor} rounded-full p-2 sm:p-2.5 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center`}
            >
              <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>

            <h3 className="font-semibold text-lg sm:text-xl text-accent">
              {platform}
            </h3>
          </div>

          <span
            className={`self-start sm:self-auto text-xs px-2.5 py-1 border rounded-full font-medium ${
              isConnected
                ? "text-green-600 bg-green-100 border-green-200"
                : "bg-gray-100 text-gray-500 border-slate-300"
            }`}
          >
            {isConnected ? "Posting Enabled" : "Not Connected"}
          </span>
        </div>

        <p className="text-sm sm:text-md text-accent font-onest leading-relaxed font-light">
          {description}
        </p>

        <Button
          onClick={buttonAction}
          className="w-full h-11 sm:h-12 rounded-3xl bg-primary font-bold text-white"
        >
          {buttonText}
        </Button>

        {connectionNote && (
          <div className="rounded-lg p-3 bg-white/40">
            <p className="text-xs text-accent font-onest leading-relaxed">
              {connectionNote}
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg p-3.5 space-y-2">
          <h4 className="font-semibold text-xs text-accent font-onest">
            What You&apos;ll Need
          </h4>

          <ul className="space-y-1">
            {requirements.map((req, index) => (
              <li
                key={index}
                className="text-xs text-accent flex items-start gap-1.5 font-onest leading-relaxed"
              >
                <span className="text-gray-400">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
