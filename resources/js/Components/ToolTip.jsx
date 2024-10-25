import { Tooltip, TooltipContent, TooltipProvider } from "@/shadcdn/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function ToolTip({ trigger, content }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{trigger}</TooltipTrigger>
                <TooltipContent className="bg-white text-black font-semibold">
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
