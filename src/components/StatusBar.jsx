import { GitBranch, XCircle, AlertTriangle, CheckCheck, Bell } from 'lucide-react';

const StatusBar = () => {
  return (
    <div className="h-6 bg-vscode-statusBar text-white flex items-center justify-between px-2 text-[12px] font-sans select-none shrink-0">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          <GitBranch size={14} />
          <span>main*</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          <div className="flex items-center space-x-1"><XCircle size={14} /><span>0</span></div>
          <div className="flex items-center space-x-1"><AlertTriangle size={14} /><span>0</span></div>
        </div>
        <div className="hidden sm:flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          <CheckCheck size={14} />
          <span>Prettier</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          Portfolio v1.0 | Ready
        </div>
        <div className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          UTF-8
        </div>
        <div className="hidden md:block cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          CRLF
        </div>
        <div className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          React
        </div>
        <div className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">
          <Bell size={14} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
