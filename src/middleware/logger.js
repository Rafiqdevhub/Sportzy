export const apiLogger = () => {
  return (req, res, next) => {
    const startTime = Date.now();

    // Capture the original end method
    const originalEnd = res.end;

    // Override res.end to log when response is sent
    res.end = function (...args) {
      const duration = Date.now() - startTime;

      // Log the request details
      logRequest({
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        fullUrl: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get("user-agent"),
        query:
          req.query && Object.keys(req.query).length > 0
            ? req.query
            : undefined,
        params:
          req.params && Object.keys(req.params).length > 0
            ? req.params
            : undefined,
      });

      // Call the original end method
      originalEnd.apply(res, args);
    };

    next();
  };
};

const logRequest = (info) => {
  const statusColor = getStatusColor(info.statusCode);
  const methodColor = getMethodColor(info.method);

  console.log("\n" + "=".repeat(80));
  console.log(
    `[${info.timestamp}] ${methodColor}${info.method}\x1b[0m ${info.fullUrl}`,
  );
  console.log(
    `Status: ${statusColor}${info.statusCode}\x1b[0m | Duration: ${info.duration} | IP: ${info.ip}`,
  );

  if (info.params) {
    console.log(`Params: ${JSON.stringify(info.params)}`);
  }

  if (info.query) {
    console.log(`Query: ${JSON.stringify(info.query)}`);
  }

  console.log("=".repeat(80));
};

const getStatusColor = (statusCode) => {
  if (statusCode >= 200 && statusCode < 300) {
    return "\x1b[32m"; // Green for success
  } else if (statusCode >= 300 && statusCode < 400) {
    return "\x1b[36m"; // Cyan for redirect
  } else if (statusCode >= 400 && statusCode < 500) {
    return "\x1b[33m"; // Yellow for client error
  } else if (statusCode >= 500) {
    return "\x1b[31m"; // Red for server error
  }
  return "\x1b[0m"; // Reset
};

const getMethodColor = (method) => {
  switch (method) {
    case "GET":
      return "\x1b[34m"; // Blue
    case "POST":
      return "\x1b[32m"; // Green
    case "PUT":
    case "PATCH":
      return "\x1b[33m"; // Yellow
    case "DELETE":
      return "\x1b[31m"; // Red
    default:
      return "\x1b[0m"; // Reset
  }
};

export const logger = {
  info: (message, ...args) => {
    console.log(`\x1b[36m[INFO]\x1b[0m ${message}`, ...args);
  },

  error: (message, ...args) => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`, ...args);
  },

  warn: (message, ...args) => {
    console.warn(`\x1b[33m[WARN]\x1b[0m ${message}`, ...args);
  },

  success: (message, ...args) => {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m ${message}`, ...args);
  },

  debug: (message, ...args) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`\x1b[35m[DEBUG]\x1b[0m ${message}`, ...args);
    }
  },
};
