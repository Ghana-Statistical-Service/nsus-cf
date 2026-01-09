export default function Footer() {
  return (
    <footer className="mt-1 border-t border-slate-200 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Ghana Statistical Service. All rights reserved.</p>
        <p className="mt-1">
          This System is designed and managed by{" "}
          <span className="font-medium">Digital Services & Technology</span>
        </p>
      </div>
    </footer>
  );
}
