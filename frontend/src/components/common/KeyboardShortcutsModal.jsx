const KeyboardShortcutsModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center border-b px-6 py-4">

          <h2 className="text-2xl font-bold text-blue-600">
            ⌨ SmartERP Keyboard Shortcuts
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        <div className="p-6 space-y-8">

          {/* Authentication */}

          <div>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              🔐 Authentication
            </h3>

            <table className="w-full border">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-semibold w-40">
                    Enter
                  </td>
                  <td className="p-3">
                    Next Field
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    F9
                  </td>
                  <td className="p-3">
                    Login / Register
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">
                    Esc
                  </td>
                  <td className="p-3">
                    Back
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              🏢 Company
            </h3>

            <table className="w-full border">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-semibold w-40">
                    ← →
                  </td>
                  <td className="p-3">
                    Select Company
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    Enter
                  </td>
                  <td className="p-3">
                    Open Company
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">
                    F2
                  </td>
                  <td className="p-3">
                    Create Company
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* List Pages */}

          <div>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📋 List Pages
            </h3>

            <table className="w-full border">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-semibold w-40">
                    F2
                  </td>
                  <td className="p-3">
                    Add New Record
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    F3
                  </td>
                  <td className="p-3">
                    Search
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    F4
                  </td>
                  <td className="p-3">
                    Edit Selected Record
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">
                    Delete
                  </td>
                  <td className="p-3">
                    Delete Selected Record
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* Forms */}

          <div>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📝 Forms
            </h3>

            <table className="w-full border">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-semibold w-40">
                    Enter
                  </td>
                  <td className="p-3">
                    Next Field
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    F9
                  </td>
                  <td className="p-3">
                    Save
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">
                    Esc
                  </td>
                  <td className="p-3">
                    Cancel
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* Reports */}

          <div>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📊 Reports
            </h3>

            <table className="w-full border">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-semibold w-40">
                    ← →
                  </td>
                  <td className="p-3">
                    Switch Reports
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">
                    F10
                  </td>
                  <td className="p-3">
                    Download PDF
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              🧭 Navigation
            </h3>

            <table className="w-full border">

              <tbody>

                <tr className="border-b">
                  <td className="p-3 font-semibold w-40">
                    ↑ ↓
                  </td>
                  <td className="p-3">
                    Sidebar Navigation
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    Home
                  </td>
                  <td className="p-3">
                    First Menu
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">
                    End
                  </td>
                  <td className="p-3">
                    Last Menu
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">
                    Enter
                  </td>
                  <td className="p-3">
                    Open Menu
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* System */}

         {/* System */}

<div>

  <h3 className="text-xl font-semibold text-blue-600 mb-3">
    ⚙ System
  </h3>

  <table className="w-full border">

    <tbody>

      <tr className="border-b">
        <td className="p-3 font-semibold w-40">
          F1
        </td>

        <td className="p-3">
          Open Keyboard Shortcuts
        </td>
      </tr>

      <tr className="border-b">
        <td className="p-3 font-semibold">
          Esc
        </td>

        <td className="p-3">
          Close Keyboard Shortcuts
        </td>
      </tr>

      <tr>
        <td className="p-3 font-semibold">
          F8
        </td>

        <td className="p-3">
          Logout
        </td>
      </tr>

    </tbody>

  </table>

</div>

        </div>

      </div>
      <div className="border-t pt-5">

  <p className="text-center text-gray-600">

    💡 <span className="font-semibold">Tip:</span> Press{" "}

    <span className="bg-gray-200 px-2 py-1 rounded font-semibold">
      Esc
    </span>

    {" "}or click{" "}

    <span className="font-semibold text-red-500">
      ×
    </span>

    {" "}to close this window.

  </p>

</div>

    </div>
  );
};

export default KeyboardShortcutsModal;