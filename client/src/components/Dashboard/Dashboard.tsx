import React from 'react';
import { useAuth } from '../Auth/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (

    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">DevHelper Bot</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">שלום, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                התנתק
              </button>
            </div>
          </div>
        </div>
  </header>
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">בחר פעולה</h2>
          <p className="text-gray-600">מה תרצה לעשות היום?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* חיפוש קוד */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">חיפוש קוד</h3>
              <p className="text-gray-600">חפש דוגמאות קוד והסברים מהירים</p>
            </div>
          </div>

          {/* הסבר טעויות */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">הסבר טעויות</h3>
              <p className="text-gray-600">קבל הסבר על שגיאות מהקונסול</p>
            </div>
          </div>

          {/* מאגר קוד אישי */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">מאגר קוד אישי</h3>
              <p className="text-gray-600">שמור וחפש בסניפטים שלך</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
