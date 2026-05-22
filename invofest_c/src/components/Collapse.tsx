import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
    title: string;
    description: string;
}

const Collapse: React.FC<CollapseProps> = ({ title, description }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); 
    return (
        
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="cursor-pointer w-full px-4 py-3 flex items-center gap-4 bg-white hover:bg-gray-50 transition-colors"
            >
                <div className="p-2 bg-gray-100 rounded">
                    <ChevronDown
                        size={20}
                        className={`text-gray-600 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>
              
                <span className="text-lg font-semibold text-gray-800 text-left">
                    {title}
                </span>
            </button>

            {isOpen && (
                <div className="px-4 py-3 border-t border-gray-100 bg-white">
                    <p className="text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Collapse;