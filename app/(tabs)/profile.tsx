import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTabSwipe } from "../../components/useTabSwipe";

interface StatItem {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const STATS: StatItem[] = [
  { label: "Current Streak", value: "12 days", icon: "flame", color: "#ff5722" },
  { label: "Total Cards Mastered", value: "1,234", icon: "checkmark-circle", color: "#4caf50" },
  { label: "Study Hours", value: "48.5h", icon: "time", color: "#2196f3" },
  { label: "Accuracy Rate", value: "87%", icon: "ribbon", color: "#ffb300" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const swipeHandlers = useTabSwipe("profile");

  const handleLogout = () => {
    router.replace("/auth/login");
  };

  const StatCard = ({ item }: { item: StatItem }) => (
    <View style={styles.statCard}>
      <Ionicons name={item.icon as any} size={24} color={item.color} />
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} {...swipeHandlers}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-circle" size={80} color="#ddd" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@gallery.com</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat, index) => (
            <StatCard key={index} item={stat} />
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Ionicons name="notifications" size={20} color="#000" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Text style={styles.settingDescription}>
                  Manage notification preferences
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Ionicons name="lock-closed" size={20} color="#000" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Privacy</Text>
                <Text style={styles.settingDescription}>
                  Control who can see your decks
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Ionicons name="contrast" size={20} color="#000" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Appearance</Text>
                <Text style={styles.settingDescription}>
                  Choose light or dark theme
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Help & Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Ionicons name="help-circle" size={20} color="#000" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>FAQ</Text>
                <Text style={styles.settingDescription}>
                  Frequently asked questions
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Ionicons name="mail" size={20} color="#000" />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Contact Support</Text>
                <Text style={styles.settingDescription}>
                  Get help from our team
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out" size={20} color="#f44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarPlaceholder: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  statCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#000",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: "#999",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f44336",
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f44336",
  },
});
