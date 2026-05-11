import { motion } from 'framer-motion';

const WorkWithMe = () => {
  return (
    <div className="p-8 md:p-16 max-w-4xl mx-auto font-mono text-sm leading-relaxed prose prose-invert">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="minimal-card p-8 md:p-12 rounded-md relative overflow-hidden shadow-lg"
      >
        <h1 className="text-3xl text-white font-bold mb-8 border-b border-vscode-border pb-6 relative z-10 flex items-center">
          <span className="text-vscode-accent font-mono text-xl mr-4">06.</span>
          Work With Me
        </h1>

        <div className="space-y-6 text-vscode-text">
          <p>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <h2 className="text-2xl text-white font-semibold mt-8 mb-4">
            <span className="text-gray-500">##</span> What I bring to the table
          </h2>

          <ul className="list-disc pl-6 space-y-2 marker:text-vscode-accent">
            <li><strong>Technical Excellence:</strong> Clean, maintainable, and scalable code.</li>
            <li><strong>Design Sense:</strong> A keen eye for aesthetics and user experience.</li>
            <li><strong>Problem Solving:</strong> Ability to tackle complex challenges efficiently.</li>
            <li><strong>Communication:</strong> Clear, transparent, and timely updates.</li>
          </ul>

          <h2 className="text-2xl text-white font-semibold mt-12 mb-6">
            <span className="text-vscode-textDark font-mono text-lg mr-2">##</span> My Process
          </h2>

          <div className="bg-[#1E1E1E] border border-vscode-border rounded-md p-8 relative z-10">
            <ol className="list-decimal pl-6 space-y-6 marker:text-vscode-accent font-sans text-base">
              <li>
                <strong className="text-blue-300 font-mono">Discovery:</strong> Understanding your goals, requirements, and constraints.
              </li>
              <li>
                <strong className="text-blue-300 font-mono">Planning:</strong> Architecture, tech stack selection, and timeline estimation.
              </li>
              <li>
                <strong className="text-blue-300 font-mono">Execution:</strong> Iterative development with regular check-ins.
              </li>
              <li>
                <strong className="text-blue-300 font-mono">Delivery:</strong> Thorough testing, deployment, and documentation.
              </li>
            </ol>
          </div>

          <p className="mt-12 italic text-vscode-textDark font-sans text-lg border-l-4 border-vscode-accent pl-6 py-2">
            &gt; "Great things in business are never done by one person. They're done by a team of people." - Steve Jobs
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkWithMe;
