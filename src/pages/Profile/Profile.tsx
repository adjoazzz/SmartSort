import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { StatusBadge } from "../../components/StatusBadge";
import imgUserProfileAvatar from "../../assets/6c7b9dccb9925ee83b19c4f4237c7c6aa454950a.png";

export default function Profile() {
  return (
    <PageLayout
      title="Collector Profile"
      description="Detailed view of collector performance and information."
      actions={
        <button className="bg-card border border-border text-foreground dark:text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-background dark:hover:bg-secondary transition-colors">
          Edit Profile
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col items-center p-6">
            <div className="w-24 h-24 rounded-full bg-[#e2e8f0] overflow-hidden border-4 border-white shadow-sm ring-1 ring-[#cbd5e1] mb-4">
              <img
                src={imgUserProfileAvatar}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-foreground dark:text-white">
              Kwame Mensah
            </h2>
            <p className="text-sm font-medium text-muted-foreground mb-4">
              ID: COL-001
            </p>
            <StatusBadge label="Active" variant="success" />

            <div className="w-full mt-6 pt-6 border-t border-border flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Region
                </span>
                <span className="text-sm font-semibold text-foreground dark:text-white">
                  North Sector
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Joined
                </span>
                <span className="text-sm font-semibold text-foreground dark:text-white">
                  Mar 2024
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Contact
                </span>
                <span className="text-sm font-semibold text-[#006c49]">
                  +233 24 123 4567
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Recent Activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Total Collections
              </span>
              <span className="text-2xl font-bold text-foreground dark:text-white">
                1,284
              </span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Avg Rating
              </span>
              <span className="text-2xl font-bold text-foreground dark:text-white">
                4.8 <span className="text-sm text-[#d97706]">⭐</span>
              </span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col col-span-2 md:col-span-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                On-Time Rate
              </span>
              <span className="text-2xl font-bold text-foreground dark:text-white">
                96.5%
              </span>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col flex-1">
            <div className="p-4 border-b border-[#f1f5f9] dark:border-[#0f2942] flex justify-between items-center bg-background dark:bg-secondary">
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                Recent Jobs
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-card border-b border-[#f1f5f9] dark:border-[#0f2942]">
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  <tr className="hover:bg-background dark:hover:bg-secondary transition-colors">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      Today, 10:30 AM
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                      North Hub Station B
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      142 kg
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <StatusBadge label="Completed" variant="success" />
                    </td>
                  </tr>
                  <tr className="hover:bg-background dark:hover:bg-secondary transition-colors">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      Yesterday, 2:15 PM
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                      East Sector Point 4
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      89 kg
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <StatusBadge label="Completed" variant="success" />
                    </td>
                  </tr>
                  <tr className="hover:bg-background dark:hover:bg-secondary transition-colors">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      May 1, 09:00 AM
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-foreground dark:text-white">
                      Central Hub Point 1
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      210 kg
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <StatusBadge label="Completed" variant="success" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 border-t border-[#f1f5f9] dark:border-[#0f2942] bg-card rounded-b-xl text-center">
              <button className="text-[#006c49] text-sm font-semibold hover:underline">
                View All History
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
