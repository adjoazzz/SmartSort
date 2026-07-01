const { prisma } = require('../lib/prisma');

class AlertService {
  async getAlerts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [alerts, totalCount] = await Promise.all([
      prisma.alert.findMany({
        orderBy: { createdAt: 'desc' },
        include: { device: true },
        skip,
        take: limit,
      }),
      prisma.alert.count(),
    ]);

    const formattedAlerts = alerts.map((alert) => {
      const diffMs = new Date() - new Date(alert.createdAt);
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const timeSub = diffHours > 0 ? `${diffHours} hours ago` : `${diffMins} mins ago`;

      return {
        id: alert.id,
        deviceIcon: alert.device?.deviceType || "bin",
        deviceName: alert.device?.customBinId || "Unknown Device",
        deviceLocation: alert.device?.location || "Unknown Location",
        severity: alert.severity,
        messageTitle: alert.title,
        messageDesc: alert.description,
        timestampMain: new Date(alert.createdAt).toLocaleString(),
        timestampSub: timeSub,
        actions: [
          { label: "Mark as Read", type: "secondary" },
          { label: "Dispatch Tech", type: "primary" },
        ],
      };
    });

    return {
      alerts: formattedAlerts,
      totalCount,
    };
  }

  async getAlertsSummary() {
    const alerts = await prisma.alert.findMany();
    const critical = alerts.filter(a => a.severity === 'CRITICAL').length;
    const warning = alerts.filter(a => a.severity === 'WARNING').length;
    return { critical, warning };
  }
}

module.exports = new AlertService();
