const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  dialog,
} = require("electron");
const path = require("path");
const { AceBaseServer } = require("acebase-server");
const { app: express, server } = require("./server");
const { app: client, clientServer } = require("./client");

require("electron-reload")(__dirname);

const createAceBaseServer = () => {
  const acebaseServer = new AceBaseServer("store2go", {
    host: "localhost",
    port: 5757,
    transactions: {
      log: true, // Enable
      maxAge: 30, // Keep logs of last 30 days
      noWait: false, // Data changes wait for log to be written
    },
    authentication: {
      enabled: true,
      allowUserSignup: true,
      defaultAccessRule: "auth",
      defaultAdminPassword: "admin",
    },
  });

  acebaseServer.db.indexes.create("inventory/products", "sku");
  acebaseServer.db.indexes.create("inventory/products", "description");
  acebaseServer.db.indexes.create("inventory/products", "brand");
  acebaseServer.db.indexes.create("inventory/products", "category");
  acebaseServer.db.indexes.create("inventory/products", "supplier");
  acebaseServer.db.indexes.create("orders", "status");
  acebaseServer.db.indexes.create("orders", "createdAt");
  acebaseServer.db.indexes.create("orders", "orderId");

  acebaseServer.on("ready", () =>
    console.log("AceBase Server running @ localhost:5757")
  );
};

const createTray = () => {
  const iconPath = path.join(__dirname, "./icon.png");
  const trayIcon = nativeImage
    .createFromPath(iconPath)
    .resize({ width: 24, height: 24 });
  const tray = new Tray(trayIcon);
  const menuTemplate = [
    {
      label: null,
      enabled: false,
    },
    {
      label: "Dashboard",
      enabled: true,
      click: () => {
        createWindow();
      },
    },
    {
      label: "Start Server",
      enabled: false,
      click: () => {
        server.listen(express.get("Port"), express.get("Host"), () => {
          menuTemplate[2].enabled = false;
          menuTemplate[3].enabled = true;
          buildTrayMenu(menuTemplate);
        });
      },
    },
    {
      label: "Stop Service",
      enabled: true,
      click: () => {
        server.close((e) => {
          console.log("E: ", e);
          menuTemplate[2].enabled = true;
          menuTemplate[3].enabled = false;
          buildTrayMenu(menuTemplate);
        });
      },
    },
    {
      label: "About",
      click: () => {
        console.log("Clicked About");
        dialog.showMessageBox({
          type: "info",
          title: "Express In Tray Apps V.1.0.0",
          message: "About....",
        });
      },
    },
    {
      label: "Quit",
      click: () => app.quit(),
    },
  ];

  const buildTrayMenu = (menu) => {
    let lblStatus = "Inactive";
    let iconStatus = "./icon/red.png";
    if (!menu[1].enabled) {
      iconStatus = "./icon/green.png";
      lblStatus = "Active";
    }

    const iconStatusPath = path.join(__dirname, iconStatus);

    menu[0].label = `Service Status ${lblStatus}`;
    menu[0].icon = nativeImage
      .createFromPath(iconStatusPath)
      .resize({ width: 24, height: 24 });

    const trayMenu = Menu.buildFromTemplate(menu);
    tray.setContextMenu(trayMenu);
  };

  // buildTrayMenu(menuTemplate);
  server.listen(express.get("Port"), express.get("Host"), () => {
    menuTemplate[2].enabled = false;
    menuTemplate[3].enabled = true;
    buildTrayMenu(menuTemplate);
  });

  clientServer.listen(client.get("Port"), client.get("Host"), () => {
    buildTrayMenu(menuTemplate);
  });
  
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.removeMenu();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createTray();
  createAceBaseServer();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    // app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
  }
});

app.on("quit", () => {
  server.close();
  clientServer.close()
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
