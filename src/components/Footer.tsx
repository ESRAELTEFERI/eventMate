export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-0 mt-8">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} EventMate. All rights reserved.
      </p>
    </footer>
  );
}
