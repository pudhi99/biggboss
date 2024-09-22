import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full mt-8">
      <div className="container px-4 xl:px-32 mx-auto">
        {/* Underline separator */}
        <hr className="border-t border-gray-700 mb-8" />

        {/* Main content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Voting Information */}
          <div>
            <h2 className="text-lg font-bold mb-4">Bigg Boss 8 Voting</h2>
            <p className="text-sm">
              Stay updated with live voting for Bigg Boss 8 Telugu. Vote for
              your favorite contestants and check out the latest voting trends.
            </p>
          </div>

          {/* Updates & Highlights */}
          <div>
            <h2 className="text-lg font-bold mb-4">Daily Updates</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <p>Daily News</p>
                </Link>
              </li>
              <li>
                <Link href="/highlights">
                  <p>Episode Highlights</p>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <p>How to Watch</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contestants */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contestants</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contestants">
                  <p>Meet the Contestants</p>
                </Link>
              </li>
              <li>
                <Link href="/#vote">
                  <p>Voting Process</p>
                </Link>
              </li>
              <li>
                <Link href="/#elimination">
                  <p>Elimination Updates</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Stay Connected</h2>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <Link
                  href="mailto:info@biggbossvote.com"
                  className="text-yellow-300"
                >
                  info@biggbossvote.com
                </Link>
              </li>
              <li>
                Facebook:{" "}
                <Link href="https://facebook.com" className="text-yellow-300">
                  Bigg Boss Updates
                </Link>
              </li>
              <li>
                Twitter:{" "}
                <Link href="https://twitter.com" className="text-yellow-300">
                  @BiggBoss8Telugu
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Bigg Boss 8 Telugu Voting. All
          rights reserved.
        </div>
      </div>
    </div>
  );
}
